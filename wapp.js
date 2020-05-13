
var Wapp = function() {

    var handleTheme = function() {}


    /**
     *  console.log(Wapp.form().get());
     *  console.log(Wapp.element().get('rel', 'usueml'));
     */

    return {
        init: function() {

        },
        element: function (){   
            return {
                /**
                 * PEGANDO ELEMENTO
                 * type [id, class, name, rel]
                 */
                get : function (type = null, element = null){
                    if(type === null || element === null){
                         return el;
                    }else{
                        var el = null;
                        switch (type) {
                          case 'class':
                             el = $("."+element).val();
                             break;
                          case 'name':
                            el = $("input[name='"+element+"']").val()
                            break;
                          case 'rel':
                            el = $("input[rel='"+element+"']").val()
                            break;
                          default:
                            el = $("#"+element).val();
                            break;
                        }
                        return el;
                    }         
                },
                set : function (type = null, element = null, value = null){
                    if(type === null || element === null){
                         return el;
                    }else{
                        var el = null;
                        switch (type) {
                          case 'class':
                             el = $("."+element).val(value);
                             break;
                          case 'name':
                            el = $("input[name='"+element+"']").val(value)
                            break;
                          case 'rel':
                            el = $("input[rel='"+element+"']").val(value)
                            break;
                          default:
                            el = $("#"+element).val(value);
                            break;
                        }
                        return el;
                    }         
                },


            }
        },
        form: function (){
            return {
                /**
                 * RETORNANDO CAMPOS DO FORM
                 */
                get : function(forms = null, filter = null)
                {
                    var form = (forms === null) ? $('form') : $(forms);
                    if(filter === null){
                        var inputs = form.find(':input').each(function() {
                            return $(this).val();
                        }).serializeArray();
                    }else{
                        var inputs = form.find(':input').filter(function() {
                            return $(this).val();
                        }).serializeArray();
                    }
                    var data = {};
                    $.each(inputs, function (index, obj){ 
                        if (data[obj.name]) {
                            if (!data[obj.name].push) {
                                data[obj.name] = [data[obj.name]];
                            }
                            data[obj.name].push(obj.value || '');
                        } else {
                            data[obj.name] = obj.value || '';
                        }
                    });
                    
                    return data;  
                },

                /**
                 * LIMPANDO FORMULARIO
                 */
                 reset : function(){
                    $('form').each(function(){
                        $(this).find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
                        $(this).find(':checkbox, :radio').prop('checked', false);
                        //FALTA SELECT2
                        //FALTA CHECKBOX (estilizado)
                    });
                 },
                
                /**
                 * DESABILITANDO FORMULARIO
                 */
                disabled : function(){
                    $("input, select, textarea").attr("disabled","disabled");
                    $("input[type='submit'], input[name='submit'], button[type='submit'], button[name='submit'], input[type='file']").hide();
                    $(".date-set, .date-reset, .spinner-up, .spinner-down").hide();
                },

                /**
                 * VALIDANDO O FORMULARIO
                 */
                validate : function (forms){
                    var form1 = $(forms).validate({
                         submitHandler: function (form) {
                            alert();
                         }
                    });

                    $('.fld_required, .dig_required, .dat_required, .eml_required, .tel_required').each(function() {
                        
                        if($(this).hasClass("fld_required")){
                            $(this).rules("add", {
                                required: true
                            });
                        }

                        if($(this).hasClass("dig_required")){
                            $(this).rules("add", {
                                digits: true
                            });
                        }

                        if($(this).hasClass("dat_required")){
                            $(this).rules("add", {
                                dateBR: true
                            });
                        }

                        if($(this).hasClass("eml_required")){
                            $(this).rules("add", {
                                email: true
                            });
                        }

                        if($(this).hasClass("tel_required")){
                            $(this).rules("add", {
                                email: true
                            });
                        }

                        var n = $(this).attr('maxlength');
                        if (typeof n !== typeof undefined && n !== false) {
                            $(this).rules("add", {
                                maxlength: n
                            });
                        }

                        var n = $(this).attr('minlength');
                        if (typeof n !== typeof undefined && n !== false) {
                            $(this).rules("add", {
                                minlength: n
                            });
                        }

                    });

                    /**
                     * CUSTOM VALIDADORES
                     */
                    $.validator.addMethod("dateBR", function (value, element) {
                        if (value.length != 10) return (this.optional(element) || false);
                        var data = value;
                        var dia = data.substr(0, 2);
                        var barra1 = data.substr(2, 1);
                        var mes = data.substr(3, 2);
                        var barra2 = data.substr(5, 1);
                        var ano = data.substr(6, 4);
                        if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return (this.optional(element) || false);
                        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return (this.optional(element) || false);
                        if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return (this.optional(element) || false);
                        if (ano < 1900) return (this.optional(element) || false);
                        return (this.optional(element) || true);
                    }, "Digite uma data válida");
          
                    $.validator.addMethod("mobilebr", function (value, element) {
                        value = value.replace("(", "");
                        value = value.replace(")", "");
                        value = value.replace("-", "");
                        value = value.replace("_", "");
                        value = value.replace(" ", "");
                        return this.optional(element) || /[0-9]{10}/.test(value) || /[0-9]{11}/.test(value);
                    }, "Por favor, digite um número de telefone válido. Ex: (00) 0000-0000 ou (00) 00000-0000");
                
                    $.validator.messages.required = "Este campo é obrigatório.";
                    $.validator.messages.email = "Por favor, digite um endereço de e-mail válido.";
                    $.validator.messages.maxlength = "Por favor, não digite mais do que {0} caracteres.";
                    $.validator.messages.minlength = "Por favor, digite pelo menos {0} caracteres.";
                    $.validator.messages.digits = "Por favor, digite apenas dígitos.";

                },
            }
        },

    }

}();

