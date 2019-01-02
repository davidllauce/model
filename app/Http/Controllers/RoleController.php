<?php

namespace MODEL\Http\Controllers;

use Illuminate\Http\Request;
use MODEL\Http\Requests\RoleRequest;
use MODEL\Http\Resources\{RoleResource,RolePermissionResource};
use MODEL\Repositories\RoleRepository;

class RoleController extends Controller
{
    protected $repository;
    
    public function __construct(RoleRepository $roles)
    {
        $this->repository = $roles;
    }
    
    /**
     * *Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        return RoleResource::collection($this->repository->index());
    }

    /**
     * *Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        return new RoleResource($this->repository->store($request->only('name','slug','description')));
    }

    /**
     * *Display the specified resource.
     *
     * @param Request $request
     * @param [Number] $role
     * @return void
     */
    public function show(Request $request,$role)
    {        
        return new RoleResource($this->repository->show($role));
    }

    /**
     * *Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  [Number]  $role
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, $role)
    {
        $role = $this->repository->update($role,$request->only(['name','slug','description']));
        return new RoleResource($role);
    }

    /**
     * *Remove the specified resource from storage.
     *
     * @param  [Number]  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $role)
    {
        $this->repository->destroy($role);
        return response()->json(null,200);
    }

    /**
     * *Get the permissions of a certain role
     *
     * @param Request $request
     * @param [Number] $role
     * @return void
     */
    public function getPermissions(Request $request, $role)
    {
        return new RolePermissionResource($this->repository->show($role));
    }

    /**
     * *Assign a new permission to a role
     *
     * @param Request $request
     * @param [Number] $role
     * @return void
     */
    public function assignPermission(Request $request, $role)
    {
        $this->repository->assignPermission($role,$request->input('permission_id'));
        return response()->json(null,200);
    }

    /**
     * *Remove a permission to a role
     *
     * @param Request $request
     * @param [Number] $role
     * @return void
     */
    public function revokePermission(Request $request, $role)
    {
        $this->repository->revokePermission($role,$request->input('permission_id'));
        return response()->json(null,200);
    }

}
