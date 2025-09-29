import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    profile: {
      employee_number: {
        type: String,
        unique: true,
        required: true,
      },
      first_name: {
        type: String,
        required: true,
        minlength: [2, "El first_name debe tener al menos 2 caracteres"],
        maxlength: [50, "el first_name debe tener al menos 50 caracteres"],
      },
      last_name: {
        type: String,
        required: true,
        minlength: [2, "El lastName debe tener al menos 2 caracteres"],
        maxlength: [50, "el lasName debe tener al menos 50 caracteres"],
      },
      phone: {
        type: String,
      },
      asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
      },
    },
    deletedAt: { type: Date, default: null },
    // ! FALTA COMPLETAR ACA
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
UserSchema.virtual("assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "responsible",
});

export const UserModel = model("User", UserSchema);
