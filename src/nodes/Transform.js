import BaseNode from "./BaseNode.js";

export default class Transform extends BaseNode
{
   constructor (X3D, scene, typeName, name)
   {
      super (X3D, scene, typeName, name);
   }

   convert (converter)
   {
      void converter;
   }
};
