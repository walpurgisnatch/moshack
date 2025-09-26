import mongoose, { Document, Schema, UpdateQuery } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

import { Role } from '@/shared/types';

export interface IUserSkill extends Document {
  skill: mongoose.Types.ObjectId;
  experience: number;
}

export interface IUserTask extends Document {
  task: mongoose.Types.ObjectId;
  progress: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
  role: Role.Admin | Role.Operator | Role.Player;
  level: number;
  experience: number;
  coins: number;
  skills: IUserSkill[];
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  level: number;
  experience: number;
  tasks: IUserTask[];
  skills: IUserSkill[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserTaskSchema = new mongoose.Schema<IUserTask>({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  progress: { type: Number, required: true, default: 0 },
})

const UserSkillSchema = new mongoose.Schema<IUserSkill>({
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  experience: { type: Number, required: true, default: 0 },
})

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true, dropDups: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: Object.values(Role), default: Role.Player },
  level: { type: Number, required: true, default: 1 },
  experience: { type: Number, required: true, default: 0 },
  tasks: [UserTaskSchema],
  skills: [UserSkillSchema]
});

// Перед сохранением хэшировать пароль
// UserSchema.pre('save', async function (next) {
//   const user = this as IUser;

//   // Хэшировать только если пароль был изменён или новый
//   if (!user.isModified('password') || !user.password) return next();
//   try {
//     const salt = await genSalt(10);
//     user.password = await hash(user.password, salt);
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

// Добавляем метод к схеме
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    // Сравниваем введенный пароль с хэшированным паролем в базе данных
    return await compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// UserSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate() as UpdateQuery<typeof this>;

//   // Если пароль изменяется, нужно его захэшировать
//   if (update && update.password) {
//     const salt = await genSalt(10);
//     update.password = await hash(update.password, salt);
//   }

//   next();
// });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
