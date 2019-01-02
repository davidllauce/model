<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProfileModuleTest extends TestCase
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

        $this->userDefault = factory(\SECREA\User::class)->create([
            'name' => 'danny',
            'email' => 'danny@secrea.net'
        ]);

        $this->userDefault->profile()->create([
            'dni'        => '12345678',
            'phone'      => '123456789',
            'birth_date' => date('Y-m-d'),
            'address'    => '',
        ]);

        return $this->userDefault;
    }


   /** @test */
    public function profile_authenticated_user ()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->get('/api/profiles/auth')
                         ->assertStatus(200)
                         ->assertJsonStructure(['data'=>['dni','phone','birth_date','address']]);
    }

    /** @test */
    public function profile_update()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->json('PATCH','/api/profiles',[
                             'dni'=>'87654321',
                             'phone' => '987654321',
                             'birth_date'=> date('Y-m-d'),
                             'address' => 'Lambayeque'
                        ])->assertStatus(200);
    }

}
