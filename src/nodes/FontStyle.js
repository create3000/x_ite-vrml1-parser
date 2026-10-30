import BaseNode from "./BaseNode.js";

export default class FontStyle extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("size",   new X3D .Fields .SFFloat (10));
      this .fields .set ("family", new X3D .Fields .SFString ("SERIF"));
      this .fields .set ("style",  new X3D .Fields .SFString ("NONE"));
   }
};
