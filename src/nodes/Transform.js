import BaseNode from "./BaseNode.js";

export default class Transform extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("translation",      new X3D .Fields .SFVec3f ());
      this .fields .set ("rotation",         new X3D .Fields .SFRotation ());
      this .fields .set ("scaleFactor",      new X3D .Fields .SFVec3f (1, 1, 1));
      this .fields .set ("scaleOrientation", new X3D .Fields .SFRotation ());
      this .fields .set ("center",           new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      const transform = converter .transforms .at (-1);

      if (!transform)
         return;

      const { X3D } = this;

      let matrix = new X3D .Fields .SFMatrix4f ();

      matrix .setTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);

      let m = new X3D .Fields .SFMatrix4f ();

      m .setTransform (this .fields .get ("translation"),
                       this .fields .get ("rotation"),
                       this .fields .get ("scale"),
                       this .fields .get ("scaleOrientation"),
                       this .fields .get ("center"));

      matrix = matrix .multLeft (m);

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};
