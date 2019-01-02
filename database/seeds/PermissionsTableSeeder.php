<?php

use Caffeinated\Shinobi\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
             /**
             * Role 6
             */
            [
	            "name"  		=> "roles: lista",
                "slug"  		=> "roles-index",
                "description"   => "Obtener una lista roles"
            ],
            [
	            "name"  		=> "roles: eliminar",
                "slug"  		=> "roles-destroy",
                "description"   => "Eliminar roles"
            ],
            [
	            "name"  		=> "roles: editar",
                "slug"  		=> "roles-update",
                "description"   => "Modificar roles"
            ],
            [
	            "name"  		=> "roles: crear",
                "slug"  		=> "roles-store",
                "description"   => "Registrar o crear roles"
            ],
            [
	            "name"  		=> "roles: one",
                "slug"  		=> "roles-show",
                "description"   => "Obtener un rol en específico"
            ],
            [
	            "name"  		=> "roles: permisos",
                "slug"  		=> "roles-permission",
                "description"   => "Obtener permisos de un rol"
            ],

            /**
             * User: access 7 - 11
             */
            [
	            "name"  		=> "usuarios: lista",
                "slug"  		=> "users-index",
                "description"   => "Obtener una lista de usuarios"
            ],
            [
	            "name"  		=> "usuarios: eliminar",
                "slug"  		=> "users-destroy",
                "description"   => "Eliminar usuario"
            ],
            [
	            "name"  		=> "usuarios: editar",
                "slug"  		=> "users-update",
                "description"   => "Modificar usuario"
            ],
            [
	            "name"  		=> "usuarios: crear",
                "slug"  		=> "users-store",
                "description"   => "Registrar o crear usuario"
            ],
            [
	            "name"  		=> "usuarios: one",
                "slug"  		=> "users-show",
                "description"   => "Obtener un usuario en específico"
            ]
        ];

        foreach ($permissions as $id => $permission) {
            Permission::create($permission);
        }
	    
    }
}
