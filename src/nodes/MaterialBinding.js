import BaseNode from "./BaseNode.js";

export default class MaterialBinding extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("value", new X3D .Fields .SFString ("OVERALL"));
   }

   convert (converter)
   {
      converter .materialBindings .push (this);
   }
};
