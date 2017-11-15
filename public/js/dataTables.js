$(document).ready(function () {

    var odd = 0;
    $('.dataTables-example').dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/users/data",
        "sPaginationType": "full_numbers",
        "sDom": '<""lfg>t<"F"tp>',
        pageLength: 20,
        stateSave: true,
        // dom: 'lTfgitp',
        "autoWidth": true,
        "ordering": false,
        "responsive": true,
        "columns": [{
            "data": "id",
            "render": function (data, type, row) {
                odd = (odd + 1) % 2;

                // console.log(row.competitive.data[row.competitive.order[0].name]);
                if (row.profile.rank == null) {
                    // quick play로 변경 필요 
                    // console.log(row.nick);
                }

                var competitive = row.hasCompetitive;

                var portraitUrl;
                if (row.competitive.order[0] !== undefined) {
                    portraitUrl = row.competitive.data[row.competitive.order[0].name].portrait;
                } else {
                    portraitUrl = row.quickplay.data[row.quickplay.order[0].name].portrait;
                }
                // console.log(row);

                var layoutHtml = "";
                // layoutHtml += '<div class="row">';
                // layoutHtml += '<div class="col-lg-12">';
                layoutHtml += '<a href="/profile?id=' + row.id.replace("#", "-") + '">';
                layoutHtml += '<div class="widget-head-color-box navy-bg p-lg text-center ' + ((odd) ? "large-portrait-bg-right" : "large-portrait-bg-left") + '" style="background-image:url(' + ((competitive) ? row.competitive_portrait : row.quickplay_portrait) + ');">';
                layoutHtml += '<div class="row m-b-xs">';
                layoutHtml += '<div class="col-xs-3 col-sm-3 col-md-4 col-lg-4 text-center">';
                layoutHtml += '<div class="level-container" style="background-image:url(' + row.profile.levelBasePicture + ');">';
                layoutHtml += '<div class="level-star" style="background-image:url(' + row.profile.levelPicture + ');"></div>';
                layoutHtml += '<div class="level-string">' + row.profile.level + '</div>';
                layoutHtml += '</div>';
                layoutHtml += '</div>';
                layoutHtml += '<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 text-center ">';
                layoutHtml += '<img src="' + row.profile.avatar + '" class="img-circle img-large-portrait" alt="profile">';
                layoutHtml += '</div>';
                layoutHtml += '<div class="col-xs-3 col-sm-3 col-md-4 col-lg-4 text-center">';
                if (competitive) {
                    layoutHtml += '<img src="' + row.profile.rankPicture + '" class="img-small-portrait" alt="profile">';
                }
                layoutHtml += '<div style="text-align: center;"><strong>' + ((competitive) ? row.profile.rank : "") + '</strong></div>';
                layoutHtml += '</div>';

                layoutHtml += '</div>';
                layoutHtml += '<div class="row">';
                layoutHtml += '<div>';
                layoutHtml += '<span><i class="fa fa-trophy"></i> ' + row.seq + '위</span> |';
                if (competitive) {
                    layoutHtml += '<span>승률 ' + ((row.competitive_global.games_won / row.competitive_global.games_played * 100).toFixed(1)) + '%</span> |';
                }
                layoutHtml += '<span>목숨당처치 ' + (((competitive) ? (row.competitive_global.eliminations / row.competitive_global.deaths) : (row.quickplay_global.eliminations / row.quickplay_global.deaths)).toFixed(1)) + '</span>';
                layoutHtml += '</div>';
                layoutHtml += '</div>';
                layoutHtml += '</div>';
                layoutHtml += '</a>';
                layoutHtml += '<div class="widget-text-box">';
                layoutHtml += '<div class="row">';
                layoutHtml += '<div class="col-xs-7 col-sm-7 col-md-6 col-lg-6">';
                layoutHtml += '<h4 class="media-heading">' + row.id + '</h4>';
                layoutHtml += '</div>';
                layoutHtml += '<div class="col-xs-5 col-sm-5 col-md-6 col-lg-6 text-right">';
                layoutHtml += '<a class="btn btn-xs btn-primary"><i class="fa fa-clock-o"></i>' + row.timestamp + '</a>';
                layoutHtml += '</div>';
                layoutHtml += '</div>';
                layoutHtml += '<div class="row">';
                layoutHtml += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
                layoutHtml += '<small>승리한 게임 ' + ((competitive) ? row.competitive_global.games_won : row.quickplay_global.games_won) + '회</small>';
                layoutHtml += '</div>';
                layoutHtml += '<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">';
                layoutHtml += '<ul class="tag-list" style="padding: 0">';
                layoutHtml += '<li><a href=""><i class="fa fa-tag"></i> Tank</a></li>';
                layoutHtml += '<li><a href=""><i class="fa fa-tag"></i> Flex</a></li>';
                layoutHtml += '<li><a href=""><i class="fa fa-tag"></i> Support</a></li>';
                layoutHtml += '</ul>';
                layoutHtml += '</div>';
                layoutHtml += '</div>';
                layoutHtml += '</div>';
                // layoutHtml += '</div>';
                // layoutHtml += '</div>';
                return layoutHtml;
            },
            "targets": 0
        }, ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $(nRow).removeClass('odd');
            $(nRow).removeClass('even');
        },
        language: {
            searchPlaceholder: "배틀태그 검색"
        }
    });

});