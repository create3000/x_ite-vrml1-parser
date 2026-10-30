import BaseNode from "./BaseNode.js";

export default class AsciiText extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("string",        new X3D .Fields .MFString ());
      this .fields .set ("spacing",       new X3D .Fields .SFFloat (1));
      this .fields .set ("justification", new X3D .Fields .SFString ("LEFT"));
      this .fields .set ("width",         new X3D .Fields .MFFloat ());
   }
};
