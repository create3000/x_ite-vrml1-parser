import BaseNode from "./BaseNode.js";

export default class Separator extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Convert child

      for (const node of this .fields .get ("children"))
         node .convert (converter);
   }
};
