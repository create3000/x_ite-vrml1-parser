import { expect, test } from "vitest";
import X3D from "https://cdn.jsdelivr.net/npm/x_ite@latest/dist/x_ite.min.mjs";
import "../../src/x_ite-vrml1-parser.js";

test .concurrent ("airboat", async () =>
{
   const
      canvas  = document .createElement ("x3d-canvas"),
      browser = canvas .browser;

   const scene = await browser .createX3DFromURL (new X3D .MFString ("https://create3000.github.io/Library/Models/Vehicles/airboat.wrl"));

   expect (scene .rootNodes) .not .toHaveLength (0);
});
