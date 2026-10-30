import BaseNode from "./BaseNode.js";

export default class Coordinate3 extends BaseNode
{
   constructor (X3D, scene, name)
   {
      super (X3D, scene, "Coordinate3", name);

      this .fields .set ("point", new X3D .Fields .MFVec3f ());
   }

   convert (converter)
   {
      void converter;
   }
};
