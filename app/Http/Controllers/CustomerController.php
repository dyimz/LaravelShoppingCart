<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use View;
use Redirect;
use DB;
use Session;
use Auth;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function show($id)
    {
        $customer = Customer::find($id);
        return response()->json($customer);
    }

    public function index()
    {
       return View::make('customer.index');
    }

    public function getCustomerAll(Request $request){
        if ($request->ajax()){
            $customers = Customer::orderBy('customer_id','DESC')
            ->get();
            return response()->json($customers);
         }
    }

    public function store(Request $request)
    {
        parse_str($request->getContent(),$data);
        $customer = Customer::create($data);
        Log::info($customer);
        return response()->json($customer);//   211104
        // return response()->json(["success" => "customer created successfully.","customer" => $customer,"status" => 200]);
    }
    public function edit($id)
    {
        $customer = Customer::find($id);
        return response()->json($customer);
        }
    public function update(Request $request, $id)
    {
        if ($request->ajax()) {
        $customer = Customer::find($id);
        $customer = $customer->update($request->all());
        $customer = Customer::find($id);
         return response()->json($customer);
        }
    } 

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(["success" => "customer deleted successfully.","data" => $customer,"status" => 200]);
    }
    
    public function search(Request $request){
      $search = $request->search;
      if($search == ''){
         $customers = Customer::orderBy('customer_id','DESC')->get();
      }else{
         $customers = Customer::orderby('lname','asc')->select('customer_id','lname')->where('lname', 'like', '%' .$search . '%')->limit(10)->get();
      }
      $response = array();
      foreach($customers as $customer){
         $response[] = array("value"=>$customer->customer_id,"label"=>$customer->lname);
         $response = array();
      foreach($customers as $customer){
         $response[] = array("value"=>$customer->customer_id,"label"=>$customer->lname);
      }
      $response['customers'] = $customers;
      // echo json_encode($response);
      return response()->json($response);
     }
 }
}
