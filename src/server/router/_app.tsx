import z from "zod";
import fs from "fs";
import path from "path";
import { procedure, router } from "../trpc";
import { Context } from "react";

const editRequestProcedure = procedure.input(
  z.object({
    url: z.string(),
  }),
)

export const appRouter = router(
  {
    saveEditRequest: editRequestProcedure
      .input(
        z.object({
          request: z.string()
        }),
      )
      .mutation(async ({ input }) => {
        if (input.request !== "") {
          let fileContents = JSON.parse(fs.readFileSync('/images.json', "utf8"));
          const request = fileContents?.request ? fileContents.request : [];
          request.push(input);
          fileContents = {
            original: fileContents.original,
            request: request
          }
          fs.writeFileSync('/images.json', JSON.stringify(fileContents));
          return true
        }
      }),
    getImage: procedure
      .input(
        z.object({
          get: z.string()
        }),
      )
      .query(({ input }) => {
        const imgData = JSON.parse(fs.readFileSync("/images.json", "utf8"));
        return imgData
      })
  },
)

export type AppRouter = typeof appRouter;