<?php

namespace MODEL\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        $rules = [
            'name'     => 'required|string|max:60',
            'email'    => 'required|string|email|max:60|unique:users',
            'role_id'  => 'required|integer',
            'password' => 'required|string|min:6|confirmed'
        ];

        if($request->isMethod('PATCH')){
            $rules['email']                 = 'required|string|email|max: 60|unique:users,email,'.$this->user.',id';
            $rules['password']              = trim($this->password) == ''?'': 'required|min:6';
            $rules['role_id']               = '';
        }

        return $rules;
    }
}
