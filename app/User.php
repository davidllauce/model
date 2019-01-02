<?php

namespace MODEL;

use Caffeinated\Shinobi\Traits\ShinobiTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable,ShinobiTrait;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','name', 'email', 'password','status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password','remember_token',
    ];

    /**
     * *Passport
     *
     * @param [type] $username
     * @return void
     */
    public function findForPassport($username) 
    { 
        return self::where(['email'=> $username,'status'=>1])->first();
    }

    /**
     * *Get the profile record associated with the user.
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * *Interested record associated with the user.
     */
    public function interested()
    {
        return $this->hasOne(Interested::class);
    }

    /**
     * *Registereds or enroll of a user.
     */
    public function registereds()
    {
        return $this->hasMany(Registered::class);
    }
    
    /**
     * *Get authenticate user role 
     *
     * @return array
     */
    public function getRole()
    {
        if (isset($this->roles[0])) {
            return [
                'name'        => $this->roles[0]->name,
                'slug'        => $this->roles[0]->slug,
                'permissions' => $this->roles[0]->getPermissions(),
            ];
        }
        return null; 
    }
    
}
