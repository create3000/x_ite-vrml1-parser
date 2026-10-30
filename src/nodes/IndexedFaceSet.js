import BaseNode from "./BaseNode.js";

export default class IndexedFaceSet extends BaseNode
{
   constructor (X3D, name)
   {
      super (X3D, "IndexedFaceSet", name);

      this .fields .set ("vertexOrdering", new X3D .Fields .SFString ("COUNTERCLOCKWISE"));

      this .fields .set ("coordIndex",        new X3D .Fields .MFInt32 (0));
      this .fields .set ("materialIndex",     new X3D .Fields .MFInt32 (-1));
      this .fields .set ("normalIndex",       new X3D .Fields .MFInt32 (-1)),
      this .fields .set ("textureCoordIndex", new X3D .Fields .MFInt32 (-1));
   }

   convert (converter)
   {
      console .log ("convert", this .typeName);
   }
};
