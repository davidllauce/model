<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class GradeModuleTest extends TestCase
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
    public function store_grade()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                        ->json('POST','/api/grades',[
                            'name'=>'Décimo de Secundaria',
                            'section' => 'A'
                        ])
                        ->assertStatus(201);
    }

    /** @test */
    public function index_grade()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->get('/api/grades')
                         ->assertStatus(200);    
    }

    /** @test */
    public function show_grade()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                        ->get('/api/grades/primero-de-secundaria-a')
                        ->assertStatus(200);
    }

    /** @test */
    public function show_grade_danger()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                        ->get('/api/grades/primero-de-secundaria')
                        ->assertStatus(404);
    }

    /** @test */
    public function update_grade()
    {
        $response = $this->actingAs($this->defaultUser(),'api')
                         ->json('PATCH','/api/grades/primero-de-secundaria-a',[
                            'name'=>'Sexto de secundaria',
                            'section'=>'A'
                         ])->assertStatus(200)
                         ->assertJson(['data'=>[
                             'name'=>'Sexto de secundaria',
                             'slug'=>'sexto-de-secundaria-a',
                             'section'=>'A'
                         ]]);
    }

    
}
