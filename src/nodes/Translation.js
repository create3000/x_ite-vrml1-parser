import BaseNode from "./BaseNode.js";

export default class Translation extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("translation", new X3D .Fields .SFVec3f ());
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

      matrix = matrix .translate (this .fields .get ("translation"));

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};
