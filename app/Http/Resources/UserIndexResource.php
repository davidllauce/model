<?php

namespace MODEL\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class UserIndexResource extends Resource
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
            'id'     => $this->id,
            'name'   => $this->name,
            'email'  => $this->email,
            'status' => $this->status,
        ];
    }
}
