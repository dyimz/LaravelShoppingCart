<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item;
class Order extends Model
{
 protected $table = 'orderinfo';
 protected $primaryKey = 'orderinfo_id';
 public $timestamps = false;
 protected $fillable = ['customer_id','date_placed','date_shipped','shipping','shipvia','status'];
 public function customer(){
 return $this->belongsTo('App\Models\Customer');
 }
 public function items(){
 return $this->belongsToMany(Item::class,'orderline','item_id','orderinfo_id')->withPivot('quantity');
 }
}
