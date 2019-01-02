<?php

namespace MODEL\Http\Controllers;

use Illuminate\Http\Request;
use MODEL\Repositories\ProfileRepository;
use MODEL\Http\Requests\ProfileRequest;
use MODEL\Http\Resources\ProfileShowResource;

class ProfilesController extends Controller
{
    protected $repository;

    public function __construct(ProfileRepository $profiles)
    {
        $this->repository = $profiles;
    }

    protected function update(ProfileRequest $request)
    {
        $profile = $this->repository->update(auth()->user()->id,$request->only('dni','phone','birth_date','address'));
        return new ProfileShowResource( $profile );
    }

    protected function show(Request $request)
    { 
        $profile = $this->repository->show(auth()->user()->id);
        return new ProfileShowResource( $profile );
    }
}
