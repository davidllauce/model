<?php

namespace MODEL\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class RolePermissionResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'slug'        => $this->slug,
            'permissions' => PermissionResource::collection($this->permissions)
        ];
    }
}
