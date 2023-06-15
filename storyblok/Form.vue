<template>
<div class="contact bg_colordark" v-editable="blok">
<section class="container">

<h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
<p class="text-center w-responsive mx-auto mb-5">We will get back to you as soon as possible.</p>

<div class="row justify-content-center">
    <div class="col-md-9 mb-md-0 mb-5">
        <form id="contact-form" name="contact-form" action="https://mailthis.to/aurora-ties" method="POST" encType="multipart/form-data">

            <div class="row">
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="name" name="name" class="form-control">
                        <label for="name" class="">Your name</label>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input type="text" id="email" name="email" class="form-control">
                        <label for="email" class="">Your email</label>
                    </div>
                </div>

            </div>

            <div class="row">

                <div class="col-md-12">

                    <div class="md-form">
                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                        <label for="message">Your message</label>
                    </div>

                </div>
            </div>

            <input type="hidden" name="_after" value="">

            <div class="text-center text-md-left">
            <button type="submit" class="btn-outline-light btn btn-dark" >Send</button>
            </div>
        </form>
    </div>
 

</div>

</section>
    </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
.contact{
    margin:100px;
}
</style>