<?php

namespace MODEL\Http\Middleware;

use Closure;

class AuthPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $user = auth()->user();
        if (!$user->status){
            return response()->json(['sms'=>'Usuario no autorizado'],401);
        }

        if ($user->isRole('admin'))
            return $next($request);
            
        $permission = str_replace('.', '-', $request->route()->getName());

        if($user->can($permission))
            return $next($request);

        return response()->json(['sms'=>'Acceso denegado'],403);
    }
}
