<?php 

namespace MODEL\Repositories;

use Caffeinated\Shinobi\Models\Role;

class RoleRepository
{

    /** 
     * *Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        return Role::paginate(10);
    }

    /**
     * *Store a newly created resource in storage.
     *
     * @param [array] $attr
     * @return void
     */
    public function store($attr)
    {
        return Role::create($attr);
    }

    /**
     * *Display the specified resource.
     * Show permissions of rol
     * @param  [number]  $role
     * @return \Illuminate\Http\Response
     */
    public function show($role)
    {        
        return Role::find($role);
    }

    /**
     * * Update the specified resource in storage.
     *
     * @param [number] $role
     * @param [array] $attr
     * @return void
     */
    public function update($role, $attr)
    {
        $role = Role::find($role);
        $role->slug = null;
        $role->update($attr);
        return $role;
    }

    /**
     * *Remove the specified resource from storage.
     *
     * @param [type] $role
     * @return void
     */
    public function destroy( $role)
    {
        $role = Role::find($role);
        $role->delete();
    }

    /**
     * *Get the permissions of a certain role
     *
     * @param [Number] $role
     * @return void
     */
    public function getPermissions($role)
    {
        return Role::find($role);
    }
    
    /**
     * *Assign a new permission to a role
     *
     * @param [Number] $role_id
     * @param [Number] $permission_id
     * @return void
     */
    public function assignPermission($role_id, $permission_id)
    {
        $role = Role::find($role_id);
        $role->assignPermission($permission_id);
        $role->save();
        return response()->json(null,200);
    }

    /**
     * *Remove a permission to a role
     *
     * @param [Number] $role_id
     * @param [Number] $permission_id
     * @return void
     */
    public function revokePermission($role_id, $permission_id)
    {
        $role = Role::find($role_id);
        $role->revokePermission($permission_id);
        $role->save();
        return response()->json(null,200);
    }
}