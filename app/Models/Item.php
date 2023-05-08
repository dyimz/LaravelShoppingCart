<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $table = 'item';
    protected $fillable = ['description', 'sell_price','cost_price','img_path'];
    protected $primaryKey = 'item_id';
    public $timestamps = FALSE;
}
