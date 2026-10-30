import BaseNode from "./BaseNode.js";

export default class Sphere extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);
   }

   convert (converter)
   {
      console .log ("convert", this .typeName);
   }
};
