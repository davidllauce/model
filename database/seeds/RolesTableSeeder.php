    <?php

use Caffeinated\Shinobi\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [

            [
                'data' => [
                    'name' => 'Administrador',
                    'slug' => 'admin',
                    'description' => 'Usuario con todos los permisos',
                ],
                'permissions' => [
                    1, 2, 3, 4, 5, 6,
                    7, 8, 9, 10, 11
                ]
            ],
            [
                'data' => [
                    'name' => 'Gestor multimedia',
                    'slug' => 'multimedia-manager',
                    'description' => 'Gestor multimedia',
                ],
                'permissions' => [
                    
                ]
            ]

        ];

        foreach ($roles as $role) {
            Role::create($role['data'])->syncPermissions($role['permissions']);;
        }


    }
}
