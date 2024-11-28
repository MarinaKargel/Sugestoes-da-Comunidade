package modules.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "sugestao")
public class Sugestao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sugestaoSeqId")
    private Long id;

    @Column(name = "titulo", length = 50)
    private String titulo;

    @Column(name = "descricao", length = 500)
    private String descricao;

}
