<?php

namespace MODEL\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class UserShowResource extends Resource
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
            'id'        => $this->id,
            'email'     => $this->email,
            'name'      => $this->name,
            'status'    => $this->status,
            'role'      => $this->getRole(),
        ];
    }
}
