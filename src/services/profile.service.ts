import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middle";
import { db } from "../config/db";
import { RowDataPacket } from "mysql2";


const connection = db();

interface createProfile{
    id?:string,
    title: string,
    legal_name: string,
    gst_number: string,
user_id: string
}
export const createProfile = async (data: createProfile) => {
    let conn;
    try {
  
      const userSql = `
        INSERT INTO organisations (id, title, legal_name, gst_number, user_id)
        VALUES (?, ?, ?, ?,?);
      `;
     
      conn = await (await connection).getConnection();
  
      // Start transaction
      await conn.beginTransaction();
  
      // Insert user into the users table
      const [userResult]: any = await conn.execute(userSql, [data.id, data.title, data.legal_name, data.gst_number,data.user_id]);
  
      // Check if user was created successfully (affected rows should be 1)
      if (userResult.affectedRows !== 1) {
        throw new Error('Failed to create user');
      }
  
    //   // Insert role information into the user_role table
    //   const [userRoleResult]: any = await conn.execute(userRoleSql, [data.id, roleId, subRoleId]);
  
    //   // Check if role was assigned successfully (affected rows should be 1)
    //   if (userRoleResult.affectedRows !== 1) {
    //     throw new Error('Failed to assign role');
    //   }
  
      // Commit transaction
      await conn.commit();
  
      // Fetch the newly inserted user and their role information
      const fetchUserSql = `
        SELECT id FROM organisations
        WHERE id = ?;
      `;
      const [rows]: [RowDataPacket[], any] = await conn.execute(fetchUserSql, [data.id]);
  
      if (rows.length === 0) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = rows[0];
  
      console.log('User created and role assigned successfully!');
      return { 
        message: 'User created and role assigned successfully',
        user: userData
      };
  
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        return { error: "Account already exists" };
      }
  
      // Rollback transaction in case of error
      if (conn) {
        await conn.rollback();
      }
  
      console.error('Error creating user:', error);
      return { error: error.message };
  
    } finally {
      if (conn) {
        await conn.release();
      }
    }
  };

