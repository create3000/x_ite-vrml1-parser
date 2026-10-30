import BaseNode from "./BaseNode.js";

export default class Rotation extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("rotation", new X3D .Fields .SFRotation ());
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

      matrix = matrix .rotate (this .fields .get ("rotation"));

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};
