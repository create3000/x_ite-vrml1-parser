import BaseNode from "./BaseNode.js";

export default class Background extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("groundColors", new X3D .Fields .MFColor ());
      this .fields .set ("skyColors",    new X3D .Fields .MFColor (new X3D .Fields .SFColor ()));
      this .fields .set ("scenery",      new X3D .Fields .MFString (""));
   }
};
