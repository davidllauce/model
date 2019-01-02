<?php

namespace MODEL\Repositories;

use Illuminate\Support\Facades\DB;
use MODEL\Profile;

class ProfileRepository
{
    
    public function show($user_id)
    {
        return Profile::where('user_id',$user_id)->first();
    }

    public function update($user_id,$attr)
    {
        return Profile::updateOrCreate(['user_id' => $user_id],$attr);
    }
}