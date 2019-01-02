<?php

namespace MODEL\Http\Controllers;

use Illuminate\Http\Request;
use MODEL\Repositories\UserRepository;
use MODEL\Http\Requests\UserRequest;
use MODEL\Http\Resources\{UserShowResource,UserIndexResource};

class UserController extends Controller
{
    public function __construct(UserRepository $users)
    {
        $this->repository = $users;
    }

    /**
     * *Store a user
     *
     * @param UserRequest $request
     * @return void
     */
    public function store(UserRequest $request)
    {   
        
        $data = [
            'name'     => $request->input('name'),
            'email'    => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role'     => $request->input('role_id')
        ];

        return $this->repository->store($data);
    }

    /**
     * *Update data from a specific user
     *
     * @param UserRequest $request
     * @param [type] $user
     * @return void
     */
    public function update(UserRequest $request, $user)
    {   
        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email')
        ];
        if (trim($request->input('password')) != '')
            $data['password'] = trim(bcrypt($request->input('password')));
        return $this->repository->updateFields($user,$data);
    }

    /**
     * *Obtain data from a specific user
     *
     * @param Request $request
     * @param [INT] $user
     * @return void
     */
    public function show(Request $request,$user)
    {        
        return new UserShowResource($this->repository->show($user));
    }

    /**
     * *Delete User with foreign key
     *
     * @param Request $request
     * @param [INT] $user
     * @return void
     */
    public function destroy(Request $request, $user)
    {
        $this->repository->destroy($user);
        return response()->json(null,200);
    }

    /**
     * *Verify Authentication
     *
     * @return json
     */
    protected function checkAuth()
    {
        $user = auth()->user();
        if($user->status)
            return new UserShowResource(auth()->user());
        return response()->json(['sms'=>'Usuario sin acceso a la plataforma'],401);
    }

    /**
     * *Get users by role-slug
     *
     * @param Request $request
     * @return void
     */
    protected function byRole(Request $request,$role)
    {
        if($request->search && trim($request->search)!='')
            $users = $this->repository->searchByRole($role,$request->search);
        else
            $users = $this->repository->byRole($role);
        return UserIndexResource::collection($users);
    }

    /**
     * *Edit or change password
     *
     * @param Request $request
     * @return json
     */
    protected function updatePassword(Request $request)
    {
        $validatedData = $request->validate([
            'password'=>'required|min:6'
        ]); 
        $this->repository->updateFields(auth()->user()->id, [
            'password'=> bcrypt($validatedData['password'])
        ]);
        return response()->json(['update'=>true],200);
    }

    /**
     * *Edit or update status
     * *Block access to the system
     *
     * @param [INT] $user
     * @return void
     */
    protected function updateStatus($user)
    {
        $user = $this->repository->updateFieldBoolean($user,'status');
        return new UserIndexResource($user);
    }


    
}
