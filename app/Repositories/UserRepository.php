<?php 

namespace MODEL\Repositories;
use Illuminate\Support\Facades\DB;
use MODEL\User;

class UserRepository
{

    public function show($user)
    {
        return User::find($user);
    }

    public function store($attr)
    {
        $user = User::create($attr);
        $user->assignRole($attr['role']);
        return $user;
    }

    public function destroy($user_id)
    {
        $user = User::find($user_id);
        $user->delete();
    }

    public function byRole($role_slug)
    {
        $role = DB::table('roles')->where('slug',$role_slug)->first();
        return DB::table('role_user')
                    ->where('role_id',$role->id)
                    ->join('users','users.id','=','role_user.user_id')
                    ->orderBy('users.name')
                    ->select('users.*')
                    ->paginate(50);
    }

    public function searchByRole($role_slug, $words)
    {
        $role = DB::table('roles')->where('slug',$role_slug)->first();
        $users = DB::table('role_user')
                    ->where('role_id',$role->id)
                    ->join('users','users.id','=','role_user.user_id')
                    ->orderBy('users.name')
                    ->where('users.name','like',"%$words%")
                    ->select('users.*')
                    ->paginate(50);
        $users->withPath("/users/role/$role_slug?search=$words");
        return $users;
    }

    public function updateFields($user_id, $attr)
    {
        $user = User::findOrFail($user_id);
        $user->update($attr);
        return $user;
    }

    public function updateFieldBoolean($user_id, $field)
    {   
        $user = User::findOrFail($user_id);
        $user->update([
            $field => !$user[$field]
        ]);
        return $user;
    }

}