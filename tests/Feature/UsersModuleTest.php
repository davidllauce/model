<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UsersModuleTest extends TestCase
{

    use DatabaseTransactions;

    protected $userDefault;

    /**
     * Create user for test
     *
     * @return void
     */
    public function defaultUser()
    {
        if($this->userDefault){
            return $this->userDefault;
        }

        return $this->userDefault = factory(\SECREA\User::class)->create([
            'name' => 'danny',
            'email' => 'danny@secrea.net'
        ]);
    }


    /** @test */
    public function details_authenticated_user()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->get('/api/users/auth')
                         ->assertJson(['data'=>[
                            'email' => 'danny@secrea.net', 
                            'name' => 'danny', 
                         ]]);
    }

    /** @test */
    public function update_password_success()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->json('PATCH','/api/users/password',['password'=>'12345678'])
                         ->assertJson([
                             'update'=>true
                         ]);
    }

    /** @test */
    public function update_password_danger()
    {   
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->json('PATCH','/api/users/password',['password'=>'12345'])
                         ->assertJson([
                            "message" => "The given data was invalid.",
                            "errors" => [
                                "password" => [
                                    "El campo password debe tener al menos 6 caracteres."
                                ]
                            ]
                         ]);
    }

    /** @test */
    public function update_status()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->json('PATCH','/api/users/'.$this->userDefault->id.'/status')
                         ->assertJson(['data'=>[
                            'email' => 'danny@secrea.net', 
                            'name' => 'danny', 
                            'status' => 0
                         ]]);
    }

    /** @test */
    public function list_user_by_role()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->get('/api/users?role=admin')
                         ->assertStatus(200);
    }
}

