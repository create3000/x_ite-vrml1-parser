import BaseNode from "./BaseNode.js";

export default class ElevationGrid extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("verticesPerRow",    new X3D .Fields .SFInt32 ());
      this .fields .set ("verticesPerColumn", new X3D .Fields .SFInt32 ());
      this .fields .set ("gridStep",          new X3D .Fields .SFVec2f ());
      this .fields .set ("height",            new X3D .Fields .MFFloat ());
   }
};
