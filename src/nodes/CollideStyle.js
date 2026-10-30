import BaseNode from "./BaseNode.js";

export default class CollideStyle extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("collide", new X3D .Fields .SFBool ());
      this .fields .set ("proxy",   new X3D .Fields .SFNode ());
   }
};
