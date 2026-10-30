import BaseNode from "./BaseNode.js";

export default class TextLanguage extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("textLanguage", new X3D .Fields .SFString ());
   }
};
