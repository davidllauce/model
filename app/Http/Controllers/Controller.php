<?php

namespace MODEL\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function excel($fileName,$sheets)
    {
        $excel = \App::make('excel');
        $excel->create($fileName, function($excel) use ($sheets)  {
            
            foreach ($sheets as $hoja=>$config) {
                $excel->sheet($hoja, function($sheet) use ($config) {
                    $sheet->loadView("exports.".$config['view'])->with('data', $config['data']);
                });
            }

        })->export('xlsx');

    }

    protected function pdf($vista,$data)
    {       
        $pdf  =  \App::make('dompdf.wrapper');
        $view =  \View::make("exports.$vista",['data'=>$data])->render();
        $pdf->loadHTML($view);
        return $pdf;
    }

    protected function eliminar($model)
    {   
        try{
            $model->delete();
        }catch(\Exception $e){
            
        }
    }
}
