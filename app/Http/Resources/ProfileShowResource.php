<?php

namespace MODEL\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class ProfileShowResource extends Resource
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
            'dni'        => $this->dni,
            'phone'      => $this->phone,
            'birth_date' => $this->birth_date,
            'address'    => $this->address,
        ];
    }
}
