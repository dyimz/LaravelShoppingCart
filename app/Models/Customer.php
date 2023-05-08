<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    public $table = 'customer';
    public $timestamps = false;
    public $primaryKey = 'customer_id';
    protected $guarded = ['id'];
}
