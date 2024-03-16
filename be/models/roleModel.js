import mongoose from "mongoose";

// Định nghĩa schema cho vai trò (Roles)
const roleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

const createRoles = async () => {
  try {
    const rolesData = [
      { roleId: 1, roleName: "marketing manager" },
      { roleId: 2, roleName: "marketing coordinator" },
      { roleId: 3, roleName: "guest" },
      { roleId: 4, roleName: "student" },
      { roleId: 5, roleName: "admin" },
    ];

    // Lưu các vai trò vào cơ sở dữ liệu
    await Role.insertMany(rolesData);

    console.log("Roles created successfully");
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

export { Role, createRoles };
