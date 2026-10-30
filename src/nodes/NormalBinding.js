import BaseNode from "./BaseNode.js";

export default class NormalBinding extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("value", X3D .Fields .SFString ());
   }

   get value ()
   {
      return this .fields .get ("value") .getValue ();
   }

   convert (converter)
   {
      converter .normalBindings .push (this);
   }
};
