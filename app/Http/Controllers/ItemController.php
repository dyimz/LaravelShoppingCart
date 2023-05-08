<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Item;
use Response;
use Storage;
use View;
class ItemController extends Controller
{
 // public function __construct() {
 //        $this->middleware('auth:api');
 //    }
    public function index(Request $request)
    {  
        if ($request->ajax()){
           $data = Item::orderBy('item_id','DESC')->get();
            // response()->json($customers));
            return response()->json($data);
         }
    }
    public function edit($id)
    {
      	$data = Item::find($id);
         return response()->json($data);
    }
    public function store(Request $request)
    {
        $item = new Item;
        $item->description = $request->description;
        $item->sell_price = $request->sell_price;
        $item->cost_price = $request->cost_price;
        // $item->category_id = $request->category_id;
        $files = $request->file('uploads');
        $item->img_path = 'storage/images/'.$files->getClientOriginalName();
        $item->save();
        $data=array('status' => 'saved');
        Storage::put('public/images/'.$files->getClientOriginalName(),file_get_contents($files));
        return response()->json(["success" => "item created successfully.","item" => $item,"status" => 200]);
    }
  public function update(Request $request, $id)
    {
        $item = Item::findOrFail($request->item_id);
        $files = $request->file('uploads');
        $request['img_path'] = 'storage/images/'.$files->getClientOriginalName();
        $item->update($request->all());
        $item = Item::find($id);
        Storage::put('public/images/'.$files->getClientOriginalName(),file_get_contents($files));
         return Response::json($item,200);
    }
  public function delete($id)
    {
        $Item = Item::findOrFail($id);
        $Item->delete();
        $data=array('status' => 'deleted');
        return Response::json($data,200);
    }
    public function search($term=null)
    {
      // $search = $request->search;
      if(empty($term))
      {
         $items = Item::orderBy('item_id','DESC')->get();
      }
      else
      {
        $items = Item::orderby('description','asc')->where('description', 'like', '%' .$term . '%')->get();
        return response()->json($items);
        }
    }

    public function postCheckout(Request $request){
      // $items = json_decode($request->json()->all());
      $items=json_decode($request->getContent(),true);
      Log::info(print_r($request->getContent(), true));
      Log::info(print_r($items, true));
//       
        try {
            DB::beginTransaction();
            $order = new Order();
            $customer =  Customer::find(3);
            // dd($cart->items);
          $customer->orders()->save($order);
            // dd($cart->items);
          // Log::info(print_r($order->orderinfo_id, true));
          foreach($items as $item) {
            // Log::info(print_r($item, true));
             $id = $item['item_id'];
             // Log::info(print_r($, true));
             $order->items()->attach($order->orderinfo_id,['quantity'=> $item['quantity'],'item_id'=>$id]);
             // Log::info(print_r($order, true));
             $stock = Stock::find($id);
             $stock->quantity = $stock->quantity - $item['quantity'];
             $stock->save();
          }
        }
        catch (\Exception $e) {
            // DB::rollback();
            return response()->json(array('status' => 'Order failed','code'=>409,'error'=>$e->getMessage()));
            }
        DB::commit();
        return response()->json(array('status' => 'Order Success','code'=>200,'order id'=>$order->orderinfo_id));
        }//end postcheckout
}
 
