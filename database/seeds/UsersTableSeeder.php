<?php

use Illuminate\Database\Seeder;
use MODEL\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {	    
        // Administrador (1)
        User::create([
            'name' 		=> 'Nota20',
            'email'	 	=> 'admin@nota20.com',
            'password' 	=>  bcrypt('123456'),
            'status'    =>  1
        ])->assignRole(1);
        
    }
}



    
