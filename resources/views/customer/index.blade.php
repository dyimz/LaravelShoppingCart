@extends('layouts.base')
@section('body')
<a id="item" href="#">items</a>
<div id="customers" class="container">
     <button type="button" class="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#myModal"  >add <span  class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
  @if ($message = Session::get('success'))
    <div class="alert alert-success alert-block">
    <button type="button" class="close" data-dismiss="alert">×</button> 
          <strong>{{ $message }}</strong>
  </div>
  @endif
  <!-- {{-- <a href="{{Auth::logout()}}">Logout</a> --}} -->
  <div class="card-body" style="height: 75px;">
    <input type="text" id='customer_search' placeholder="--search--">
  </div> 
<div  class="container">
  <div  class="table-responsive">
    <table class="table table-striped table-hover" id="ctable" >
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Title</th>
          <th>lname</th>
          <th>fname</th>
          <th>address</th>
          <th>phone</th>
          <th class="actionsCol">Actions</th>
          </tr>
      </thead>
      <tfoot>
        <th>Customer ID</th>
        <th>Title</th>
        <th>lname</th>
        <th>fname</th>
        <th>address</th>
        <th>phone</th>
      </tfoot>
      <!-- <tbody id="cbody">
      </tbody> -->
    </table>
  </div>
</div>
</div>
<div class="modal fade" id="myModal" role="dialog" style="display:none">
    <div class="modal-dialog modal-lg" >
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Create new customer</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="cform" method="post" action="#" >
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="title" class="control-label">Title</label>
                        <input type="text" class="form-control" id="titulo" name="title" value="{{old('title')}}" >
                        @if($errors->has('title'))
                        <small>{{ $errors->first('title') }}</small>
                        @endif
                    </div> 
                    <div class="form-group"> 
                        <label for="lname" class="control-label">last name</label>
                        <input type="text" class="form-control " id="lname" name="lname" value="{{old('lname')}}" ></text>
                        @if($errors->has('lname'))
                            <small>{{ $errors->first('lname') }}</small>
                        @endif
                    </div> 
                    <div class="form-group"> 
                        <label for="fname" class="control-label">First Name</label>
                        <input type="text" class="form-control " id="fname" name="fname" value="{{old('fname')}}">
                        @if($errors->has('fname'))
                        <small>{{ $errors->first('fname') }}</small>
                        @endif
                    </div>
                    <div class="form-group"> 
                        <label for="address" class="control-label">Address</label>
                        <input type="text" class="form-control" id="address" name="addressline" value="{{old('addressline')}}">
                        @if($errors->has('addressline'))
                        <small>{{ $errors->first('addressline') }}</small>
                        @endif
                    </div>
                    <div class="form-group"> 
                        <label for="town" class="control-label">Town</label>
                        <input type="text" class="form-control" id="town" name="town" value="{{old('town')}}">
                        @if($errors->has('town'))
                        <small>{{ $errors->first('town') }}</small>
                        @endif
                    </div>
                    <div class="form-group"> 
                        <label for="zipcode" class="control-label">Zip code</label>
                        <input type="text" class="form-control" id="zipcode" name="zipcode" value="{{old('zipcode')}}">
                        @if($errors->has('zipcode'))
                        <small>{{ $errors->first('zipcode') }}</small>
                        @endif
                    </div>
                    <div class="form-group"> 
                        <label for="phone" class="control-label">Phone</label>
                        <input type="text" class="form-control" id="phone" name="phone" value="{{old('phone')}}">
                        @if($errors->has('phone'))
                        <small>{{ $errors->first('phone') }}</small>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="myFormSubmit" type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal content-->
<div class="modal fade" id="editModal" role="dialog" style="display:none">
  <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
              <h4 class="modal-title">Update customer</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
      <div class="modal-body">
        <form id="updateform" method="#" action="#" >
          <input type="hidden" name="_token" value="{{ csrf_token() }}">
          {{-- <input type="hidden" name="_method" value="PATCH"> --}}
        <div class="form-group">
            <label for="etitle" class="control-label">Title</label>
            <input type="text" class="form-control" id="etitle" name="title"  >
            @if($errors->has('title'))
             <small>{{ $errors->first('title') }}</small>
            @endif
        </div>
        <div class="form-group"> 
            <label for="elname" class="control-label">last name</label>
            <input type="text" class="form-control " id="elname" name="lname"  >
              @if($errors->has('lname'))
             <small>{{ $errors->first('lname') }}</small>
             @endif
        </div> 
          <div class="form-group"> 
            <label for="efname" class="control-label">First Name</label>
            <input type="text" class="form-control " id="efname" name="fname" >
             @if($errors->has('fname'))
                <small>{{ $errors->first('fname') }}</small>
            @endif
          </div>
          <div class="form-group"> 
            <label for="eaddress" class="control-label">Address</label>
            <input type="text" class="form-control" id="eaddress" name="addressline" >
             @if($errors->has('addressline'))
             <small>{{ $errors->first('addressline') }}</small>
             @endif
          </div>
          <div class="form-group"> 
            <label for="etown" class="control-label">Town</label>
            <input type="text" class="form-control" id="etown" name="town" >
            @if($errors->has('town'))
              <small>{{ $errors->first('town') }}</small>
            @endif
          </div>
          <div class="form-group"> 
            <label for="ezipcode" class="control-label">Zip code</label>
            <input type="text" class="form-control" id="ezipcode" name="zipcode" >
            @if($errors->has('zipcode'))
               <small>{{ $errors->first('zipcode') }}</small>
            @endif
          </div>
          <div class="form-group"> 
            <label for="ephone" class="control-label">Phone</label>
            <input type="text" class="form-control" id="ephone" name="phone" >
             @if($errors->has('phone'))
                <small>{{ $errors->first('phone') }}</small>
             @endif
          </div>
        <input type="hidden"  id="customerid" name="customer_id" value="">
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
      <button id="updatebtn" type="submit" class="btn btn-primary">Update</button>
    </div>
  </div>
</div>
</div>
@include('item.index')
@endsection