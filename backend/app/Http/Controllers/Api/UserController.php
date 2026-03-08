<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{

    // GET ALL USERS
    public function index()
    {
        return response()->json(
            User::with('roles')->get()
        );
    }


    // CREATE USER
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'nullable|in:admin,user,guest' 
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $roleToAssign = $request->role ?? 'admin';
        $user->assignRole($roleToAssign);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->load('roles')
        ]);
}


    // UPDATE USER
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        if ($request->role) {
        $user->syncRoles([$request->role]); 
    }

    return response()->json([
        'message' => 'User updated successfully',
        'user' => $user->load('roles')
    ]);
}

    // DELETE USER
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

}